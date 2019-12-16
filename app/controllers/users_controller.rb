class UsersController < ApplicationController

  def index
    return nil if params[:keyword] == ""
    @users = User.where(['name LIKE ?', "%#{params[:keyword]}%"] ).where.not(id: current_user.id).limit(10)
    respond_to do |format|
      format.html
      format.json
    end
  end

  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
    @group = Group.new(group_params)
      if @group.save
        redirect_to root_path, notice: 'グループを作成しました'
      else
        render :new
      end
  end

  private
  def user_params
    params.require(:user).permit(:name, :email)
  end
end