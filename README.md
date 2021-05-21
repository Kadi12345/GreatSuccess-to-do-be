# expressmongoosedemo

## Step 1: Install

npm install

## Step 2: Make a copy of .env-example named as .env (You can do it manually or run this command in project root)

cp .env-example .env

## Step 3 Add mongo db connection url to .env file

MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.g29ki.mongodb.net/<dbName>?retryWrites=true&w=majority

## Step 4 Run application

npm run start:dev

Igakord enne uue branchi tegemist, ole main branchis ja tee git pull.

git status - vaatad, mis branchil oled, noh nii igaks juhuks (ei taha ju muudatusi mainis teha) git checkout -b "Ticket1-Kadi" - teeb sulle uue branchi sellise nimega ja sa oledki siis sellel

kui muudatused tehtud, vaata git statusega, kas oled ikka õigel branchil ja millised muudatused siis toimunud on.

git add . - lisab muudetud/lisatud failid git commit -m"Siia kirjutad, mis sisuga sul see üleslaadimine on kah"
git push

tuleb mingi veateade, et pead branchi upstream origin blablabla, tee sellest käsust copy-paste ja sisesta. ongi sinu tehtud muudatused sinu tehtud branchis
