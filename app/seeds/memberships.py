from app.models import db, User, Community, Role, Membership

def seed_memberships():
    dallas = db.session.query(Community).get(1)
    role = db.session.query(Role).get(1)
    demo = db.session.query(User).get(1)

    membership = Membership()
    membership.user=demo
    membership.role=role
    membership.community = dallas
    db.session.add_all([membership])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_memberships():
    db.session.execute('TRUNCATE types RESTART IDENTITY CASCADE;')
    db.session.commit()
