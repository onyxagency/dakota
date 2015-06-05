if ENV["RACK_ENV"] == "production"
	root = "/var/www/getdakota.com/current"
else
	root = "/var/www/staging.getdakota.com/current"
end
working_directory root
pid "#{root}/tmp/pids/unicorn.pid"
stderr_path "#{root}/log/unicorn.log"
stdout_path "#{root}/log/unicorn.log"

if ENV["RACK_ENV"] == "production"
	listen "/tmp/unicorn.dakota.sock"
else
	listen "/tmp/unicorn.dakota_staging.sock"
end
worker_processes 1
timeout 30