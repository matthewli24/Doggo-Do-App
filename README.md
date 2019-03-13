#Doggo-Do App

A ToDo List For Dogs

# React, Flask (Restful Api), And AWS

This a todo app built with react and flask and AWS RDS mySQL.   
Developed on MacOS.

# Development 
Setup virtual env and install flask and requirements:         
```
$ cd <app>
$ virtualenv venv
$ source venv/bin/activate 
$ pip install -r requirements.txt
```  

To deactivate virtual env:   
```
$ deactivate
```  

To run app on http://localhost:5000 
```
$ python run.py
```

Starting Frontend Flask
```
$cd client
$npm install
$npm start
```


#Production
```
$cd client    
$npm run build   
$mv build/ ../api
$cd .. (go back to the root directory)
$python run.py  
http://localhost:5000   
```

This App is currently deployed on heroku as of 03/12/2019:
```
https://doggo-do-app.herokuapp.com/
```

#Improvements
* refactor the code a bit
 
