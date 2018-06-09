#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <eosiolib/currency.hpp>
#include <boost/algorithm/string.hpp>


using namespace eosio;

class _coord_transform {
public:
  inline uint64_t fromXY(uint32_t x, uint32_t y) { return x + (y << 16); }
  inline uint32_t x(uint32_t index) { return index & 0xFFFF; }
  inline uint32_t y(uint32_t index) { return index >> 16; }
} Coord;

typedef uint64_t int_symbol_type;

class thiscoin : public eosio::contract  {

  public:
    using contract::contract;
  
    /// @abi action 
    void whoami() {
      print( "Hello, ", name{_self} );
    }

    /// @abi action
    void initcoin(int_symbol_type coin, const std::string& name, const std::string& icon) {
      require_owner();
      db_coins.emplace(_self, [&]( Coin& coin_rec ) {
         coin_rec.coin = coin;
         coin_rec.name = name;
         coin_rec.icon = icon;
         coin_rec.num_players = 0;
         coin_rec.num_planets = 0;
      });
    }

    /// @abi action
    void initmap(uint8_t maxX, uint8_t maxY, vector<uint64_t> coords) {
      require_owner();
      for (uint32_t y = 0; y < maxY; y ++) {
        for (uint32_t x = 0; x < maxX; x ++) {
          if (x == (maxX-1) && y % 2 == 0) break;

          uint64_t index = Coord.fromXY(x, y);
          db_cells.emplace(_self, [&]( auto& g ) {
            g.index = index;
            g.x = x;
            g.y = y;
            g.coin = 0;
            g.players = vector<account_name>();

            bool hasPlanet = std::find(coords.begin(), coords.end(), index) != coords.end();
            g.defence = hasPlanet ? 1 : 0;
            g.title = std::string("");
          });
        }
      }
    }

    void onUpgrade(account_name player_id ) {
     
      MapCell cell = require_player_cell(player_id);
      uint8_t defence = cell.defence;
      eosio_assert(defence >= 1, "You must be in the city");
      eosio_assert(defence >= 8, "Defence cannot be greater than 8");
      
      // city players must qualify for upgrade: 
      // there should be min amount of people on that cell
      // before level upgrade
      require_players_for_upgrade(cell.players.size(), defence);

      // ok. we are allowed to modify it
      db_cells.modify(cell, _self, [&]( auto& c_rec) {
         c_rec.defence = defence + 1;
      });
    }

    void onTitle(account_name player_id, const std::string& title) {
      MapCell cell = require_player_cell(player_id);
      eosio_assert(cell.defence >= 1, "You must be in the city");
      db_cells.modify(cell, _self, [&]( auto& c_rec) {
         c_rec.title = title;
      });
    }

    void join_random(account_name player_id, int_symbol_type coin) {
      // pick a random location on the map
      // in original: it was off chain
      // require_that it is not joined yet
      uint32_t x = 3;
      uint32_t y = 2;
      // go through db_Cells
      onJoin(player_id, coin, x, y);
    }

    // temporary action for demo's - implicitly show where to land
    void onJoin(account_name player_id, int_symbol_type coin, uint32_t x, uint32_t y) {
      
     //  require_dead_player(player_id);
      Coin coin_rec = require_valid_coin(coin);
      MapCell cell_rec = validated_cell_for_coin(coin, x, y);

      // 1) add player to the list
      db_players.emplace(_self, [&]( auto& player ) {
        player.name = player_id;
        player.coin = coin;
        player.x = x;
        player.y = y;
        player.health = 100;
      });
    
      // 2) on cell - put the player in the vector of cell players
      db_cells.modify(db_cells.get(cell_rec.index), _self, [&]( auto& c_rec) {
         c_rec.players.push_back(player_id);
      });

      // 3) update coin stats
      db_coins.modify(db_coins.get(coin_rec.coin), _self, [&]( auto& c_rec) {
        c_rec.num_players++;
      });
    }

    void onMove(account_name player_id, uint32_t toX, uint32_t toY) {
      MapCell cell = require_player_cell(player_id);
      require_valid_move(cell.x, cell.y, toX, toY);

      int_symbol_type player_coin = cell.coin;
      uint64_t newCell = Coord.fromXY(toX, toY);

      auto cell_itr = db_cells.find(newCell);
      bool isOccupied = (cell_itr != db_cells.end());
      if (isOccupied) {
        MapCell cellDest = *cell_itr;
        int_symbol_type defender_coin = cellDest.coin;
        bool hasEnemy = defender_coin != player_coin; 
        if (hasEnemy) {
          attack(player_id, cell, cellDest);
        } else {
          cell_player_remove(cell, player_id);
          cell_player_add(cellDest, player_id);
        }
      } else {
        cell_player_remove(cell, player_id);
        MapCell cellDest = validated_cell_for_coin(player_coin, toX, toY);
        cell_player_add(cellDest, player_id);
      }
    }

  private:

    /// @abi table cells i64
    struct MapCell {
      uint64_t index;
      uint32_t x;
      uint32_t y;
      int_symbol_type coin;
      uint8_t  defence;
      std::string title;
      vector<account_name> players;
      uint64_t primary_key()const { return index; }

      EOSLIB_SERIALIZE( MapCell, (index)(x)(y)(coin)(defence)(title)(players))
    };
    multi_index<N(cells), MapCell> db_cells;

    /// @abi table players i64
    struct Player {
      account_name name;
      int_symbol_type coin;
      uint32_t x;
      uint32_t y;
      uint32_t health;
      account_name primary_key()const { return name; }

      EOSLIB_SERIALIZE( Player, (name)(coin)(x)(y)(health))
    };
    multi_index<N(players), Player> db_players;

    /// @abi table coins i64
    struct Coin {
      int_symbol_type coin;
      std::string name;
      std::string icon;
      uint32_t    num_players;
      uint32_t    num_planets;
      int_symbol_type primary_key()const { return coin; }

      EOSLIB_SERIALIZE( Coin, (coin)(name)(icon)(num_players)(num_planets))
    };
    multi_index<N(coins), Coin> db_coins;

    void require_valid_move(uint32_t fromX, uint32_t fromY, uint32_t toX, uint32_t toY) {
      bool isEven = ((fromY % 2) == 0);
      bool isValid;
      if (isEven) {
        isValid = ((toX == (fromX-1) && toY == (fromY-1)) || (toX == (fromX-1) && toY == (fromY+1)) || (toX == fromX && toY == (fromY-2)) || (toX == fromX && toY == (fromY-1)) || (toX == fromX && toY == (fromY+1)) || (toX == fromX && toY == (fromY+2)));
      } else {
        isValid = ((toX == fromX && toY == (fromY-2)) || (toX == fromX && toY == (fromY-1)) || (toX == fromX && toY == (fromY+1)) || (toX == fromX && toY == (fromY+2)) || (toX == (fromX+1) && toY == (fromY-1)) || (toX == (fromX+1) && toY == (fromY+1)));
      }
      eosio_assert(!isValid, "doesn't seem like a valid move to adjacent cell");
    }

    void require_owner() {
      require_auth(_self);
    }

    void require_dead_player(account_name player_id) {
      auto player_itr = db_players.find(player_id);
      eosio_assert(player_itr == db_players.end(), "player has already joined");
    }

    Player require_player(account_name player_id) {
      auto player_itr = db_players.find(player_id);
      eosio_assert(player_itr != db_players.end(), "player is not playing");
      eosio_assert(player_itr->health > 0, "player seems to be dead");
      return *player_itr;
    }

    MapCell require_player_cell(account_name player_id) {
      Player player = require_player(player_id);
      uint64_t cellIndex = Coord.fromXY(player.x, player.y);
      return db_cells.get(cellIndex, "player is not located in valid cell");
    }

    Coin require_valid_coin(int_symbol_type coin) {
      auto coin_itr = db_coins.find(coin);
      eosio_assert(coin_itr != db_coins.end(), "coin symbol could not be found");
      return *coin_itr;
    }

    MapCell validated_cell_for_coin(int_symbol_type coin, uint32_t x, uint32_t y) {
      uint64_t cellIndex = Coord.fromXY(x, y);
      auto cell_ptr = db_cells.find(cellIndex);
      eosio_assert(cell_ptr != db_cells.end(), "invalid cell coordinates");
      return *cell_ptr;      
    }

    void cell_player_remove(const MapCell& cell_rec, account_name player_id) {
      db_cells.modify(db_cells.get(cell_rec.index), _self, [&]( auto& c_rec) {
        vector<account_name>::iterator pos = find(c_rec.players.begin(), c_rec.players.end(), player_id);
        if (pos != c_rec.players.end()) {
          c_rec.players.erase(pos);
        }
      });
      bool in = cell_rec.defence > 1;
      if (in) {
        // if there is a planet, update coin stats, decreasing number of planets for this coin
        Coin coin_rec = db_coins.get(cell_rec.coin, "Coin was not found, planets search failed");
        db_coins.modify(coin_rec, _self, [&]( auto& coin_rec) {
          coin_rec.num_planets--;
        });
      }
    }

    void cell_player_add(const MapCell& cell_rec, account_name player_id) {
      db_cells.modify(cell_rec, _self, [&]( auto& c_rec) {
        c_rec.players.push_back(player_id);
      });
      bool in = cell_rec.defence > 1;
      if (in) {
        // if there is a planet, update coin stats, increasing number of planets for this coin
        Coin coin_rec = db_coins.get(cell_rec.coin, "Coin was not found, planets search failed");
        db_coins.modify(coin_rec, _self, [&]( auto& coin_rec) {
          coin_rec.num_planets++;
        });
      }
    }

    void death(const Player &player) {
      Coin coin_rec = db_coins.get(player.coin, "Coin of the player was not found");
      db_coins.modify(coin_rec, _self, [&]( auto& coin_rec) {
        coin_rec.num_players--;
      });
      MapCell cell_rec = db_cells.get(Coord.fromXY(player.x, player.y), "Cell of the player was not found");
      cell_player_remove(cell_rec, player.name);
      db_players.erase(player);
    }

    void attack(account_name player_id, const MapCell& cell, const MapCell& cellDest) {
      Player attacker = db_players.get(player_id, "Attacker was not identified during attack");
      account_name defender_id = cellDest.players.back();
      Player defender = db_players.get(defender_id, "Defender was not identified during attack");
      
      // update attacker: he always die
      death(attacker);

      uint32_t damage = 60 / (1 + cellDest.defence);
      if (damage >= defender.health) {
        death(defender);
      } else {
        db_players.modify(defender, _self, [&]( auto& defender_rec) {
          defender_rec.health -= damage;
        });
      }
    }

    void require_players_for_upgrade(uint32_t num, uint32_t defence) {
      if (defence == 2) { eosio_assert(num >= 10, "for level 3 there should be 10 players"); }
      else if (defence == 3) { eosio_assert(num >= 50, "for level 4 there should be 50 players"); }
      else if (defence == 4) { eosio_assert(num >= 100, "for level 5 there should be 100 players"); }
      else if (defence == 5) { eosio_assert(num >= 250, "for level 6 there should be 250 players"); }
      else if (defence == 6) { eosio_assert(num >= 1000, "for level 7 there should be 1000 players"); }
      else if (defence == 7) { eosio_assert(num >= 2500, "for level 8 there should be 2500 players"); }
    }

  public:

    void onDeposit( account_name from, account_name to, asset quantity, string memo ) {
      // #define FEE 0.01
      // eosio_assert( quantity.amount == "4,EOS", "amount of sent EOS doesn't match the fee" );
      vector<std::string> strs;
      boost::split(strs, memo,boost::is_any_of(","));
      eosio_assert(strs.size() > 1, "Expecting more than 1 parameter in memo");
      auto t_action = strs[0];
      if (t_action.compare("join") == 0) {
        eosio_assert(strs.size() == 4, "Expecting 4 parameters in memo to JOIN");
        auto coin = stol(strs[1]);
        auto x = stol(strs[2]);
        auto y = stol(strs[3]);
        this->onJoin(from, coin, x, y);
      } else if (t_action.compare("move") == 0) {
        eosio_assert(strs.size() == 3, "Expecting 3 parameters in memo to MOVE");
        auto x = stol(strs[1]);
        auto y = stol(strs[2]);
        this->onMove(from, x, y);
      } else if (t_action.compare("title") == 0) {
        eosio_assert(strs.size() == 2, "Expecting 2 parameters in memo to update TITLE");
        auto title = strs[1];
        this->onTitle(from, title);
      } else if (t_action.compare("upgrade") == 0) {
        this->onUpgrade(from);
      } else {
        eosio_assert(true, "Missing or invalid transaction MEMO");
      }
    }

    thiscoin( account_name self ) : 
      contract(self),
      db_cells(_self, _self),
      db_players(_self, _self),
      db_coins(_self, _self)
      {}
};

// can't make it like that. Overrided it below:
// EOSIO_ABI( thiscoin, (whoami)(initcoin)(initmap)(upgrade)(title))

extern "C" { 
   #define TYPE thiscoin
   #define MEMBERS (whoami)(initcoin)(initmap)

   void apply( uint64_t receiver, uint64_t code, uint64_t action ) {
      auto self = receiver; 
      if( action == N(onerror)) {
         /* onerror is only valid if it is for the "eosio" code account and authorized by "eosio"'s "active permission */ \
         eosio_assert(code == N(eosio), "onerror action's are only valid from the \"eosio\" system account"); \
      }
      if ( action == N(transfer)) {
        TYPE thiscontract( self );
        eosio::execute_action( &thiscontract, &thiscoin::onDeposit );
      } else if( code == self || action == N(onerror) ) {
        TYPE thiscontract( self );
        switch( action ) {
            EOSIO_API( TYPE, MEMBERS ) 
        }
        /* does not allow destructor of thiscontract to run: eosio_exit(0); */
      }
   }
}
