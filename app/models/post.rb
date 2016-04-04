class Post < ActiveRecord::Base
  belongs_to :user
  has_many :taggings
  has_many :tags, through: :taggings
  after_create :update_slug
  before_update :assign_slug

  def self.tagged_with(name)
    Tag.find_by_name!(name).posts
  end

  def self.tag_counts
    Tag.select("tags.*, count(taggings.tag_id) as count").joins(:taggings).group("taggings.tag_id")
  end

  def tag_list
    tags.map(&:name).join(', ')
  end

  def tag_ary
    tags.map(&:name)
  end

  def tag_list=(names)
    self.tags = names.split(',').map do |n|
      Tag.where(name: n.strip).first_or_create!
    end
  end

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
