class HomeController < ApplicationController

	def index
		list = @mc.lists.list({:filters => {:list_name => "Dakota"}})
		@member_count = list['data'][0]['stats']['member_count'] + 300 #NOTE: Once enough users are signed up, use real member count
		#TODO: Create table to store member count and last time accessed. Reference: http://www.impressivewebs.com/displaying-mailchimp-subscriber-count-php-mailchimp-api/
	end

	def robots
   	robots = File.read(Rails.root + "config/robots.#{Rails.env}.txt")
   	render :text => robots, :layout => false, :content_type => "text/plain"
	end

	def subscribe
		email = params[:email][:address]
		tech = params['isTech']
		if !email.blank?
			begin
				if tech == '1'
					groups = ['Tech']
				else
					groups = ['User']
				end
				@mc.lists.subscribe({ id: @list_id,
	                            email: { email: email },
	                            merge_vars: { 
	                							:groupings => [{
	                									:id => 4545,
	                             			:groups => groups
	                   						}] 
	                   					}
	                          })
				respond_to do |format|
					format.json {render :json => {:message => "success"}}
				end
			rescue Gibbon::MailChimpError => ex
				if ex.message
					respond_to do |format|        
            format.json{render :json => {:message => ex.message}}
          end
				else
					respond_to do |format|
						format.json {render :json => {:message => "An unknown error occurred."}}
					end
				end
			end
		else 
			respond_to do |format|
				format.json{render :json => {:message => "Please enter an email address."}}
			end
		end
	end

end