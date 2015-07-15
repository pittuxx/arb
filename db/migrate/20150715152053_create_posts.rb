class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.text :body
      t.string :slug
      t.string :category
      t.references :user, index: true, foreign_key: true
      t.string :meta_description
      t.string :meta_title
      t.boolean :published

      t.timestamps null: false
    end
    add_index :posts, :title, unique: true
    add_index :posts, :slug, unique: true
    add_index :posts, :meta_description, unique: true
    add_index :posts, :meta_title, unique: true
  end
end
