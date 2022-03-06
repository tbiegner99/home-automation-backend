echo "Updating permissions for $MYSQL_USER"
echo $MYSQL_PASSWORD
echo $MYSQL_ROOT_PASSWORD
mysql -hlocalhost -uroot  -p$MYSQL_ROOT_PASSWORD -e "REVOKE ALL PRIVILEGES, GRANT OPTION FROM '$MYSQL_USER'@'%';";
mysql -hlocalhost -uroot -p$MYSQL_ROOT_PASSWORD -e "GRANT SELECT, INSERT, UPDATE, DELETE ON *.* TO '$MYSQL_USER'@'%';"