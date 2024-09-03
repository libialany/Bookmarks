from dotenv import load_dotenv
load_dotenv()
from  flask import Flask,request,render_template,redirect,url_for,flash
app= Flask(__name__)
import os 
# database
import pymysql.cursors  
connection = pymysql.connect(host= os.getenv('DB_HOST'),
user=    os.getenv("DB_USER"),
password=os.getenv("DB_PASSWD"),
database=os.getenv("DB_NAME"),
cursorclass=pymysql.cursors.DictCursor)  
# end database configuration
# configuration session
app.secret_key = os.getenv('key')
app.config['SESSION_TYPE'] = 'filesystem'

@app.route('/')
def Index():
    bookmarks=[]
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM links")
        bookmarks=cursor.fetchall()
    return render_template('base.html',bookmarksList=bookmarks)
@app.route('/add_bookmark',methods=["POST"])
def add_bookmark():
    if request.method=='POST':
        name=request.form['name']
        link=request.form['link']
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO links (name,link) VALUES ('{}','{}')".format(name,link))
            flash('Bookmark Added successfully')
        connection.commit()
    return redirect(url_for('Index'))
@app.errorhandler(404)
def not_found(error):
    return render_template('error.html'), 404

@app.route('/edit_bookmark/<int:id>')
def edit_bookmark(id):
    bookmarks=[]
    with connection.cursor() as cursor:
        cursor.execute("SELECT * from links where id ={}".format(int(id)))
        bookmarks=cursor.fetchall()
    return render_template('form.html',bookmarkList=bookmarks[0])

@app.route('/delete_bookmark/<int:id>')
def delete_bookmark(id):
    with connection.cursor() as cursor:
        cursor.execute('DELETE FROM  links WHERE id={}'.format(int(id)))
    connection.commit()
    flash('Delete BookMark')
    return redirect(url_for('Index'))

@app.route('/update_bookmark/<int:id>',methods=["POST"])
def update_bookmark(id):
    if request.method=='POST':
        name=request.form['name']
        link=request.form['link']
        with connection.cursor() as cursor:
            cursor.execute("UPDATE links SET name='{}', link='{}' WHERE id={}".format(name,link,id))
        connection.commit()
        flash('Updated BookMark')
    return redirect(url_for('Index'))

if __name__ == '__main__':
    app.run(port=os.getenv('LINK_APP_PORT'),debug=True)