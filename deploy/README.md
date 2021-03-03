# Deployment
Add the dokku server as a remote:
```
git remote add dokku dokku@kjinx.mooo.com:jinx_backend
```
Add SSH key to dokku:
```
cat ~/.ssh/<key_name>.pub | ssh kjinx dokku ssh-keys:add <key_name>
```
Add appropriate configuration to `~/.ssh/config`:
```
Host kjinx.mooo.com
	HostName kjinx.mooo.com
	IdentityFile ~/.ssh/<Private key name>
```
To deploy, run:
```
deploy/deploy.sh
```
This will upload and deploy the backend directory to the backend server and then update the github repository. This should trigger Netlify to build and deploy the frontend.

# Deployment (old)

1. `ssh` into the server
2. Change directory to `/jinx/repo`
3. Pull latest changes
4. If server has enough RAM, Run `sudo deploy/deploy.py`otherwise go to step 4.1
5. Take a tea break (compiling will probably take a minute)
6. Check to see site is working properly

4.1. Open `deploy.py` and comment out the bit the React front end section

4.2. Run `sudo deploy/deploy.py`

4.3. On local branch, run `docker-compose up`

4.4. Run `docker exec -it jinx_react npm run build` to build the front end in the container.

4.5. Copy the contents of `src/frontend/build` on your local machine to `/srv/www/frontend` on the server. You might want to tar compress the file so it uploads faster

4.6. Go to step 6.

The `deploy/django/.env` file must not be checked into git.
It contains secrets that should not be published.
