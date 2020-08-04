from scrape import InstagramBot

user_name = ""
password = ""


def get_images(user, name, tags):
    bot = InstagramBot(user_name, password)

    profiles = name.split(' ')
    hashTags = tags.split(' ')

    images = bot.search(profiles, hashTags)
    return images
