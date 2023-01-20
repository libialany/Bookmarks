from  flask import Flask,request
from dotenv import dotenv_values
from flask import jsonify
from flask_cors import CORS
app= Flask(__name__)
CORS(app)
# database
import pymysql.cursors
connection = pymysql.connect(
host=dotenv_values(".env")['DB_HOST'],
user=dotenv_values(".env")['DB_USER'],
password=dotenv_values(".env")['DB_PASSWORD'],
database=dotenv_values(".env")['DB_DATABASE'],
cursorclass=pymysql.cursors.DictCursor)

# end database configuration
# configuration session
app.secret_key = dotenv_values(".env")['key']
app.config['SESSION_TYPE'] = 'filesystem'

@app.route('/bookmarks')
def Index():
    bookmarks=[]
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM links")
        bookmarks=cursor.fetchall()
    return jsonify(bookmarks)
@app.route('/add_bookmark',methods=["POST"])
def add_bookmark():
    name=request.json['name']
    link=request.json['link']
    if not name or not link:
        return jsonify({'msg':'not received'})        
    with connection.cursor() as cursor:
        cursor.execute("INSERT INTO links (name,link) VALUES ('{}','{}')".format(name,link))
    connection.commit()
    return jsonify({
        'msg':'received'
    })
@app.route('/bookmark/<id>',methods=["GET"])
def get_bookmark(id):              
    with connection.cursor() as cursor:
        cursor.execute(f"SELECT * FROM links WHERE id={id}")
        bookmark=cursor.fetchone()
        connection.commit()
        if bookmark:
            return jsonify(bookmark)    
    return jsonify({'msg':'failed'})
@app.errorhandler(404)
def not_found(error):
    return jsonify({'msg':'failed'})

@app.route('/delete_bookmark/<id>',methods=['DELETE'])
def delete_bookmark(id):
    with connection.cursor() as cursor:
        cursor.execute('DELETE FROM links WHERE id={}'.format(int(id)))
    connection.commit()
    return jsonify({'msg':'success'})

@app.route('/update_bookmark/<int:id>',methods=["PUT"])
def update_bookmark(id):      
    name=request.json['name']
    link=request.json['link']
    if not name or not link:
        return jsonify({'msg':'not received'})        
    with connection.cursor() as cursor:
        cursor.execute("UPDATE links SET name='{}', link='{}' WHERE id={}".format(name,link,id))
    connection.commit()
    return jsonify({'msg':'success'})

if __name__ == '__main__':
    app.run(port=8081,debug=False)
