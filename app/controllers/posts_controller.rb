class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, only: [:create,:update,:destroy]


  # GET /posts
  # GET /posts.json
  def index
    @posts = Post.all
    respond_with @posts
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
    respond_with @post
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
    respond_with Post.create(post_params)
  end

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
  def update
    respond_with @post.update(post_params)
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    respond_with @post.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
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
                                  :published)
    end
end
