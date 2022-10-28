from atexit import register
from app.models import db, Status

def seed_statuses():
    registered = Status(name='Registered')
    interested = Status(name='Interested')
    not_going = Status(name='Not Going')


    db.session.add_all([registered, interested, not_going])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_statuses():
    db.session.execute('TRUNCATE statuses RESTART IDENTITY CASCADE;')
    db.session.commit()
