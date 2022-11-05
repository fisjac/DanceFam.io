from app.models import db, Community

def seed_communities():
    dallas = Community(name='Dallas WCS', image_url='https://assets3.thrillist.com/v1/image/3095612/1584x1056/crop;webp=auto;jpeg_quality=60;progressive.jpg')


    db.session.add_all([dallas])
    db.session.commit()


def undo_communities():
    db.session.execute('TRUNCATE communities RESTART IDENTITY CASCADE;')
    db.session.commit()
