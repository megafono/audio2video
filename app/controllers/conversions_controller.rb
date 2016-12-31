class ConversionsController < ApplicationController
  before_action :set_conversion, only: :show

  def show
  end

  def new
    @conversion = Conversion.new
  end

  def create
    @conversion = Conversion.new(conversion_params)

    respond_to do |format|
      if @conversion.save
        @conversion.delay.convert!

        format.html { redirect_to @conversion, notice: 'Conversion was successfully created.' }
        format.json { render :show, status: :created, location: @conversion }
      else
        format.html { render :new }
        format.json { render json: @conversion.errors, status: :unprocessable_entity }
      end
    end
  end

  private

    def set_conversion
      @conversion = Conversion.find(params[:id])
    end

    def conversion_params
      params.require(:conversion).permit(:audio_url, :image_url, :email)
    end
end
