class Email < MailForm::Base
	attribute :send_email,     :validate => /\A([\w\.%\+\-]+)@([\w\-]+\.)+([\w]{2,})\z/i
	attribute :message

	def headers
		{
			:subject => "Someone has shared Dakota with you",
			:to => %("#{send_email}"),
			:from => "noreply@getdakota.com",
			:reply_to => "noreply@getdakota.com"
		}
	end
end