# # this will help build on the current machine 
# # then copy it on the server .
# env=dev
# z=rm-admin-$env
# p=admin-portal
# server=ubuntu@repricebill.com


# makeBuild () {

# rm -rf dist
# b=master
# git add .
# git commit -m "build--"
# git pull origin master
# git push origin master
# git checkout $b
# git pull origin $b
# NODE_OPTIONS=--max-old-space-size=8192 ng build --prod
# cd dist
# # zip the build
# zip -r $z.zip $p
# scp $z.zip $server:~/temp/
# build_dir="remote_$(date +'%m%d%Y-%H%M')" 
# ssh $server << START
# cd /home/ubuntu/environments/richminds/$env/builds/$p

# mkdir $build_dir
# cd $build_dir
# cp ~/temp/$z.zip ./
# rm ~/temp/$z.zip
# unzip $z.zip
# rm $z.zip
# cd ..
# rm $p
# ln -s $build_dir/$p ./$p
# echo "deployed on $(date) --- $(build_dir)" >>version.txt
# cat version.txt
# START
# }

# makeBuild


