from flask import Flask, render_template, request, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import date, datetime
from dataclasses import dataclass

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///profiles.db'
db = SQLAlchemy(app)

@dataclass
class Profile(db.Model):
    id: int
    name: str
    surname: str
    date_of_birth: date
    content: str
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    surname = db.Column(db.String(100), nullable=False)
    date_of_birth = db.Column(db.Date, nullable=True)
    content = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return 'Profile info: ' + str(self.name) + '. The post ID is ' + str(self.id)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/showprofiles', methods=['GET', 'POST'])
def profiles():
    return render_template('showProfiles.html', profiles = Profile.query.all())

@app.route('/api/get-them-all', methods=['GET', 'POST'])
def get_profiles():
    all_profiles = Profile.query.all()
    return jsonify(all_profiles)

@app.route('/api/delete/<id>', methods=['DELETE'])
def delete_this_guy(id):
    profile = Profile.query.get_or_404(id)
    db.session.delete(profile)
    db.session.commit()
    return jsonify({'message': 'successfully deleted'})


@app.route('/addprofile', methods=['GET', 'POST'])
def new_url():
    if request.method == 'POST':
        data = request.get_json()    
        new_profile = Profile(name=data['name'], surname=data['surname'], date_of_birth=datetime.strptime(data['date_of_birth'], "%Y-%m-%d"), content=data['content'])
        db.session.add(new_profile)
        db.session.commit()
        return redirect('/showprofiles')
    else:
        return render_template('addProfile.html')

if __name__ == "__main__":
    app.run(debug=True)

