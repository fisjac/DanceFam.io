flask db downgrade
rm -rf migrations/versions/*
flask db migrate -m 'create-tables'
flask db upgrade
flask seed all
