from app.models import db, Style

def seed_styles():
    wcs = Style(name='West Coast Swing')
    zouk = Style(name='Zouk')
    tango = Style(name='Tango')


    db.session.add_all([wcs, zouk, tango])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_styles():
    db.session.execute('TRUNCATE styles RESTART IDENTITY CASCADE;')
    db.session.commit()
