from bson import ObjectId
from datetime import datetime

def convert_objectid_to_str(obj):
    """
    Recursively convert ObjectId and datetime objects to strings
    """
    if isinstance(obj, ObjectId):
        return str(obj)
    elif isinstance(obj, datetime):
        return obj.isoformat()
    elif isinstance(obj, dict):
        return {key: convert_objectid_to_str(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [convert_objectid_to_str(item) for item in obj]
    else:
        return obj

def clean_document(doc):
    """
    Clean a MongoDB document by converting _id to id and removing _id
    Also converts all ObjectIds and datetimes to strings
    """
    if not doc:
        return doc
    
    # Convert _id to id
    if '_id' in doc:
        doc['id'] = str(doc['_id'])
        del doc['_id']
    
    # Recursively convert all ObjectIds and datetimes
    return convert_objectid_to_str(doc)

