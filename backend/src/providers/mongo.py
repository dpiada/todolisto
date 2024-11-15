from pymongo import MongoClient
from bson import ObjectId

class MongoError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(f"{message}")

class Mongo:
    def __init__(self, hostname, port, username, password, database_name, collection_name):
        try:
            client = MongoClient("mongodb://mongolone:mongolonepw@mongodb:27017/")
            db = client[database_name]
            self.collection = db[collection_name]
            
            print("Connected to MongoDB successfully!")
        except Exception as e:
            raise MongoError(f"Failed to connect to MongoDB: {e}")

    def create(self, data):
        try:
            result = self.collection.insert_one(data)
            return result.inserted_id
        except Exception as e:
            raise MongoError(f"Failed to insert document: {e}")

    def read_one(self, object_id):
        try:
            return self.collection.find_one({"_id": ObjectId(object_id)})
        except Exception as e:
            raise MongoError(f"Failed to fetch documents: {e}")
        
    def read(self, date: str = None, priority: str = None, status: str = None,
            order_by: str = 'date', ascending: bool = True):
        try:
            filter_query = {}

            if date:
                filter_query['date'] = date

            if priority:
                filter_query['priority'] = priority

            if status:
                filter_query['status'] = status

            sort_query = {}
            if order_by:
                sort_query[order_by] = 1 if ascending else -1

            cursor = self.collection.find(filter_query).sort(sort_query)

            return cursor

        except Exception as e:
            raise MongoError(f"Failed to fetch documents: {e}")

    def update(self, object_id, update_data):
        try:
            return self.collection.update_one({"_id": ObjectId(object_id)}, {"$set": update_data})
        except Exception as e:
            raise MongoError(f"Failed to update document: {e}")

    def delete(self, object_id):
        try:
            return self.collection.delete_one({"_id": ObjectId(object_id)})
        except Exception as e:
            raise MongoError(f"Failed to delete document: {e}")

