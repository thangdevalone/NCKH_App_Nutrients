from app_nutrients import app
from flask import render_template,redirect ,jsonify, request
import datetime

import json
# Đọc dữ liệu từ file JSON
def read_data_from_json():
    with open('app_nutrients/data/dishs.json', 'r',encoding='utf-8') as file:
        data = file.read()
        return data
    
    
@app.route('/')
def re_home():
    return redirect('/home')

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/menu')
def menu():
    return render_template('menu.html')
@app.route('/cook')
def cook():
    return render_template('cook.html')

@app.route('/search')
def search():
    return render_template('search.html')
@app.route('/nutrition/<name>')
def nutrition(name):
    data = read_data_from_json()
    foods = json.loads(data)['foods']
    
    # Lấy tham số tên món ăn từ request URL
    result = next((food for food in foods if food['nav_name'].lower() == name.lower()), None)
    concern = [dish for dish in foods if result['type'] in dish.get('concern', [])]

    return render_template('nutrition.html',data=result,concern=concern)

@app.route('/api/foods',methods=['GET'])
def find():
    
    data = read_data_from_json()
    foods = json.loads(data)['foods']
    
    search_query = request.args.get('name', '')
    dish_type = request.args.get('type','')
    
    # Tìm kiếm các món ăn có loại phù hợp trong danh sách quan tâm
    results=[]
    if(search_query and dish_type):
        return "Chưa hỗ trợ tìm kiếm cả 2 cách"
    if(dish_type):
        results = [dish for dish in foods if dish_type in dish.get('concern', [])]
    
    # Tìm kiếm các món ăn có tên chứa search_query
    if(search_query):
        results = [food for food in foods if search_query.lower() in food['name'].lower() or search_query.lower() in food['search']]
    
    if(len(search_query)==0 and len(dish_type)==0):
        return jsonify([])
    return jsonify(results)

@app.route('/api/detail/<name>',methods=['GET'])
def detail(name):
    
    data = read_data_from_json()
    foods = json.loads(data)['foods']
    
    # Lấy tham số tên món ăn từ request URL
    result = next((food for food in foods if food['nav_name'].lower() == name.lower()), None)
    if result is None:
        return jsonify({'message': 'Món ăn không tồn tại'})

    return jsonify(result)
