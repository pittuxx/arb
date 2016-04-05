class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, only: [:create,:update,:destroy]


  # GET /posts
  # GET /posts.json
  def index
    if params[:tag]
      @posts = Post.tagged_with(params[:tag]).includes(:tags)
    else
      #@posts = Post.all
      @posts = Post.includes(:tags)
    end
    respond_with @posts, methods: [:tag_list, :tag_ary]
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
    begin
      respond_with @post, :methods => :tag_list
    rescue
      redirect_to root_path
    end
  end

  # GET /posts/new
  #def new
  #  #@post = Post.new
  #  #no hace falta, se encarga Angular
  #end

  # GET /posts/1/edit
  #def edit
  #  #no hace falta, se encarga Angular?????
  #end

  # POST /posts
  # POST /posts.json
  def create
    @post = Post.create(post_params)
    @post.tag_list=(params[:tag_list])
    respond_with @post
  end

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
  def update
    @post.update_attributes(post_params)
    @post.tag_list=(params[:tag_list])
    respond_with @post
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    respond_with @post.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      #@post = Post.find(params[:id])
      @post = Post.find_by_slug(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.require(:post).permit(:title, 
                                  :body, 
                                  :slug, 
                                  :category, 
                                  :user_id, 
                                  :meta_description, 
                                  :meta_title, 
                                  :published,
                                  :user_id
                                  )
    end
end
