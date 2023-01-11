from datetime import datetime
from app.models import db, Event #Community, Style, Type

def seed_events():
    # wcs = db.session.query(Style).filter_by(name='West Coast Swing').first()
    # convention = db.session.query(Type).filter_by(name='Convention').first()
    # dallas = db.session.query(Community).filter_by(name='Dallas WCS').first()
    midnight_madness = Event(
        name='Midnight Madness',
        city='Dallas',
        state='Texas',
        country='United States',
        address='who knows',
        start=datetime(2022,10,3),
        end=datetime(2022,10,6),
        organiser_id=1,
        image_url='https://img1.wsimg.com/isteam/ip/0879c21b-987b-4263-844c-d14ccfae383b/Gary%20Susan%20provided.jpg/:/cr=t:8.27%25,l:0%25,w:100%25,h:49.73%25/rs=w:600,h:300,cg:true'
        )
    # midnight_madness.types.append(convention)
    # midnight_madness.styles.append(wcs)
    # midnight_madness.community = dallas

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
