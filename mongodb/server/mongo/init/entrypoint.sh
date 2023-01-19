#!/bin/bash
echo "MongoDB initialization triggered ..."
SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo "Script path is $SCRIPT_PATH"
TMP_FILE=/tmp/db_commands.txt

LCL_SAM_USER="$SAM_USER"
if [[ "$LCL_SAM_USER" == "" ]] ; then
    LCL_SAM_USER="sandip"
fi

LCL_SAM_PASSWORD="$SAM_PASSWORD"
if [[ "$LCL_SAM_PASSWORD" == '' ]] ; then
    LCL_SAM_PASSWORD="sandip123"
fi

#Create SAM user
mongo admin -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD --eval "db.createUser({user: '$LCL_SAM_USER', pwd: '$LCL_SAM_PASSWORD', roles: [{role: 'readWrite', db: 'admin'}]});"

# Read databases
DBS_FILE="$SCRIPT_PATH/databases.txt"
if [[ -f "$DBS_FILE" ]] ; then
    rm -f $TMP_FILE
    cat "$DBS_FILE" | while read line; do
        if [[ "$line" == \#* ]] ; then
            continue
        fi

        if [[ -z "$line" ]] ; then
            continue
        fi

        values=($line)
        size=${#values[@]}

        if [[ $size -gt 0 ]]; then
            DB_NAME=${values[0]}
        fi

        if [[ $size -gt 1 ]]; then
            USER=${values[1]}
        else
            USER=$LCL_SAM_USER
        fi

        if [[ $size -gt 2 ]]; then
            PASS=${values[2]}
        else
            PASS=$LCL_SAM_PASSWORD
        fi

        echo "use $DB_NAME;" >> $TMP_FILE
        echo "if (db.system.users.find({user:'$USER'}).count() == 0) {" >> $TMP_FILE
        echo "    db.createUser({user: '$USER', pwd: '$PASS', roles: [{role: 'readWrite', db: '$DB_NAME'}]});" >> $TMP_FILE
        echo "} else {" >> $TMP_FILE
        echo "    db.grantRolesToUser('$USER', [{role: 'readWrite', db: '$DB_NAME'}]);" >> $TMP_FILE
        echo "}" >> $TMP_FILE
    done
    mongo admin -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD < $TMP_FILE
    rm -f $TMP_FILE
fi

echo "Mongo users created."
