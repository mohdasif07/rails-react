class PostsController < ApplicationController
  # set post 
  before_action :set_post, only: [:show, :update, :destroy]

  # GET /posts/new
  def new
    @post = Post.new
  end

  # GET /posts/:id/edit
  def edit
  end

  # DELETE /posts/:id   
  # GET /posts
  
  def index
    @posts = Post.all.order(created_at: :asc)
    render json: @posts
  end

  # GET /posts/:id
  def show
    @post = Post.find_by(id: params[:id])
    if @post
      render json: @post
    else
      render json: { error: 'Post not found' }, status: :not_found
    end
  end

  # POST /posts
  def create
    @post = Post.new(post_params)
    if @post.save
      render json: @post, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PUT/PATCH /posts/:id
  def update
    @post = Post.find_by(id: params[:id])
    if @post
      if @post.update(post_params)
        render json: @post
      else
        render json: @post.errors, status: :unprocessable_entity
      end
    else
      render json: { error: 'Post not found' }, status: :not_found
    end
  end

  # DELETE /posts/:id
  def destroy
    @post = Post.find_by(id: params[:id])
    if @post&.destroy
      render json: { message: 'Post deleted successfully' }, status: :ok
    else
      render json: { error: 'Post not found' }, status: :not_found
    end
  end

  private

    # Strong parameter method to allow only specific attributes
  def post_params
    params.require(:post).permit(:title, :body)
  end
  # set post for id
  def set_post
    @post = Post.find_by(id: params[:id])
  end

end
