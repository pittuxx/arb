# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150715152053) do

  create_table "posts", force: :cascade do |t|
    t.string   "title"
    t.text     "body"
    t.string   "slug"
    t.string   "category"
    t.integer  "user_id"
    t.string   "meta_description"
    t.string   "meta_title"
    t.boolean  "published"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  add_index "posts", ["meta_description"], name: "index_posts_on_meta_description", unique: true
  add_index "posts", ["meta_title"], name: "index_posts_on_meta_title", unique: true
  add_index "posts", ["slug"], name: "index_posts_on_slug", unique: true
  add_index "posts", ["title"], name: "index_posts_on_title", unique: true
  add_index "posts", ["user_id"], name: "index_posts_on_user_id"

end
