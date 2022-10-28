from datetime import datetime
from app.models import db, Event, Community #, Style, Type

def seed_events():
    # wcs = db.session.query(Style).filter_by(name='West Coast Swing').first()
    # convention = db.session.query(Type).filter_by(name='Convention').first()
    dallas = db.session.query(Community).filter_by(name='Dallas WCS').first()
    midnight_madness = Event(
        name='Midnight Madness',
        city='Dallas',
        state='Texas',
        country='United States',
        address='who knows',
        start=datetime(2022,10,3),
        end=datetime(2022,10,6),
        organiser_id=1
        )
    # midnight_madness.types.append(convention)
    # midnight_madness.styles.append(wcs)
    midnight_madness.community = dallas

    db.session.add_all([midnight_madness])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_events():
    db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
    db.session.commit()
