class EmailsController < ApplicationController
	def new
		@email = Email.new
	end

	def create
		email = params[:send_email][:address]
		message = params[:send_email][:message]
		if !email.blank?
			begin
				@email = Email.new(:send_email => email, :message => message)
				@email.request = request
				if @email.deliver
					respond_to do |format|
						format.json {render :json => {:message => "success"}}
					end
				else
					respond_to do |format|
						format.json {render :json => {:message => "Oops, something went wrong. Please try again."}}
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