#!/bin/sh
sed -e 's/^[a-zA-Z0-9]/meteor remove --allow-incompatible-update &/' .meteor/packages | sed 's/\@[0-9\.]*//g' > packages-rm.sh
sed -e 's/ remove / add /' packages-rm.sh > packages-add.sh
bash packages-rm.sh
meteor list  # should be empty
#meteor update --release METEOR@1.2-rc.7
#bash packages-add.sh
#meteor list
