from scrape import InstagramBot


# def get_data(db):
#     data = []
#     for item in db.testCollection.find():
#         print("item", item)
#         item['_id'] = str(item['_id'])
#         print("item", item)
#         data.append(item)
#     return data


def run_selenium(name):
    bot = InstagramBot('7783250627', 'Langara!')
    images = bot.signIn(name)
    return images


def get_images_from_db(user, name):
    images = user.find_one({"user_name": name},
                           {"_id": 0, "images": 1})
    return images


def insert_images_in_db(user, images, name):
    return user.insert_one({"user_name": name, "images": images})


def get_images(user, name):
    images = get_images_from_db(user, name)
    if(images):
        return images['images']
    else:
        images = run_selenium(name)
        if(len(images) > 0):
            insert_images_in_db(user, images, name)
        return images
