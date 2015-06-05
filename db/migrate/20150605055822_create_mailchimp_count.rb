class CreateMailchimpCount < ActiveRecord::Migration
  def change
    create_table :mailchimp_counts do |t|
    	t.datetime :last_run
    	t.integer	 :list_count
    end
  end
end
