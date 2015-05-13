class ApplicationController < ActionController::Base
  #protect_from_forgery with: :exception
  before_action :setup_mcapi

  def setup_mcapi
  	@mc = Gibbon::API.new('8329f71cb8e3fd9670024307a726b536-us10')
  	@list_id = "3a1e8b156f"
  end
end
