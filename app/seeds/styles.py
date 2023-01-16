from app.models import db, Style

def seed_styles():
    wcs = Style(name='West Coast Swing')
    zouk = Style(name='Zouk')
    salsa = Style(name='Salsa')
    bachata = Style(name='Bachata')
    kizomba = Style(name='Kizomba')
    country = Style(name='Country Swing')
    ballroom = Style(name='Ballroom')

    db.session.add_all([wcs, zouk, country, ballroom, salsa, bachata, kizomba])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_styles():
    db.session.execute('TRUNCATE styles RESTART IDENTITY CASCADE;')
    db.session.commit()
