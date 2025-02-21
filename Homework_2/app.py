from flask import Flask, jsonify, render_template, request

app = Flask(__name__)
allApps = []


#Application class
class application:
    def __init__(self,name, appNum, status):
        self.name = name
        self.appNum = appNum
        self.status = status

#adds in a new application
@app.route('/api/add_app', methods=['POST'])
def add_app():
    
    print("Adding an application")
    data = request.get_json()
    name = data.get('name')
    status = "recieved"

    
    newApplication = application(name,len(allApps)+1,status)
    
    allApps.append(newApplication)
   
    
    return jsonify({'message': 'Application added successfully'})

#Checks the status of an application
@app.route('/api/check_status', methods=['POST'])
def check_status():
    print("Checking application status")

    return jsonify({'message': 'Checking application status'})


#Api to update the status of the application
@app.route('/api/update_status', methods=['POST']) 
def update_status():
    print("Updating status")

    data = {"newStatus": {'notFound', 'received', 'processing', 'accepted', 'rejected'}}
    data["newStatus"] = list(data["newStatus"])

    return jsonify(data)

#returns the render template
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True, port=5000)