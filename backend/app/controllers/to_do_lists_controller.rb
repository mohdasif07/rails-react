class ToDoListsController < ApplicationController
    def index
        @to_do_lists = ToDoList.all
        render json: @to_do_lists
    end
    def show
        @to_do_list = ToDoList.find(params[:id])
        render json: @to_do_list
    end
    def create
        @to_do_list = ToDoList.new(todo_list_params)
        if @to_do_list.save
            render json: @to_do_list, status: :created
        else
            render json: @to_do_list.errors, status: :unprocessable_entity
        end
    end
    def update
        @to_do_list = ToDoList.find(params[:id])
        if @to_do_list.update(todo_list_params)
            render json: @to_do_list
        else
            render json: @to_do_list.errors, status: :unprocessable_entity
        end
    end
    def destroy
        @to_do_list = ToDoList.find(params[:id])
        @to_do_list.destroy
        head :no_content
    end
    private
    def todo_list_params
        params.require(:to_do_list).permit(:title, :description)
    end
end
