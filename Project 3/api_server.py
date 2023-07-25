from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return 'The API is up'

@app.route('/api/<team>/<stat>')
def team(team, stat):
    db_name = '2022-2023_Regular_Season.db'
    with sqlite3.connect(db_name) as con:
        cur = con.cursor()
        cur.execute(f"select player, {stat} from players_rs where tm = '{team}' order by {stat} desc")
        cols = [col[0] for col in cur.description]
        print(cols)

        json_data = []
        for row in cur:
            json_data.append({ 'name': row[0], stat: row[1]})

        return jsonify(json_data)
    
@app.route('/api/allteams')
def all_teams():
    db_name = '2022-2023_Regular_Season.db'
    with sqlite3.connect(db_name) as con:
        cur = con.cursor()
        cur.execute("select distinct tm from players_rs order by tm")
        all_team_data = [row[0] for row in cur]
        return jsonify(all_team_data)



if __name__ == '__main__':
    app.run(debug=True)