from app.models import db, User, Event, Status, Registration

def seed_registrations():
    midnight_madness = db.session.query(Event).get(1)
    going = db.session.query(Status).get(1)
    demo = db.session.query(User).get(1)

    registration = Registration()
    registration.user = demo
    registration.status=going
    registration.event = midnight_madness
    db.session.add_all([registration])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_registrations():
    db.session.execute('TRUNCATE types RESTART IDENTITY CASCADE;')
    db.session.commit()
