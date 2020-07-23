def get_data(db):
    data = []
    for item in db.testCollection.find():
        print("item", item)
        item['_id'] = str(item['_id'])
        print("item", item)
        data.append(item)
    return data