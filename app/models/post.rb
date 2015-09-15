class Post < ActiveRecord::Base
  belongs_to :user
  after_create :update_slug
  before_update :assign_slug

  def to_param
  	slug
  end

  private
  def assign_slug
  	self.slug = "#{slug.parameterize}"
  end
  
  def update_slug
  	update_attributes slug: assign_slug
  end
end
