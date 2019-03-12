#rename this file to config.py

mysql = {
  "username": "replace me",
  "password":"replace me",
  "endpoint": "replace me",
  'db_instance_name': "replace me",
  'uri': 'mysql+pymysql://{}:{}@{}:3306/{}'.format("replace me", 
                                                   "replace me", 
                                                   "replace me", 
                                                   "replace me")
}

secrets = {
  "SECRET_KEY": "replace me",
  "JWT_SECRET_KEY": "replace me"

}