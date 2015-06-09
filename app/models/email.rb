class Email < MailForm::Base
	attribute :send_email,     :validate => /\A([\w\.%\+\-]+)@([\w\-]+\.)+([\w]{2,})\z/i
	attribute :message

	def headers
		{
			:subject => "Your friend found Dakota and immediately thought of you.",
			:to => %("#{send_email}"),
			:from => "\"Dakota\" <noreply@getdakota.com>",
			:reply_to => "\"Dakota\" <noreply@getdakota.com>"
		}
	end
end