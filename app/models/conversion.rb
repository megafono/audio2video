require 'open-uri'

class Conversion < ApplicationRecord
  validates :audio_url, :image_url, :email, presence: true

  attr_accessor :audio_input_path, :image_input_path, :movie_output_path

  enum status: [:pending, :uploaded, :notified]

  def convert!
    @movie_output_path = id.to_s + ".mp4"
    transcode!
    upload!
    notify!
  ensure
    clean
  end

  private

  def transcode!
    download_audio
    download_image

    transcoder = FFMPEG::Transcoder.new(nil, movie_output_path, [
      "-f", "image2",
      "-loop", "1",
      "-r", "2",
      "-i", image_input_path,
      "-shortest",
      "-c:a", "copy",
      "-c:v", "libx264",
      "-crf", "23",
      "-preset", "veryfast"
    ], input: audio_input_path)
    transcoder.run
  end

  def upload!
    response = `curl -F "file=@#{movie_output_path}" https://file.io/?expires=1w`
    self.movie_url = JSON.parse(response)["link"]
    self.save!
  end

  def notify!
    ConversionMailer.converted(self).deliver_now
  end

  def download_audio
    download self.audio_url, audio_input_path
  end

  def download_image
    download self.image_url, image_input_path
  end

  def audio_input_path
    @audio_input_path ||= create_file_path(self.audio_url)
  end

  def image_input_path
    @image_input_path ||= create_file_path(self.image_url)
  end

  def create_file_path(url)
    file_name = [self.email, url].join("-").gsub(/\W/, '-')
    Rails.root.join('tmp', file_name).to_s
  end

  def download(url, file_path)
    `curl -L #{url} -o #{file_path}`
  end

  def clean
    File.delete(audio_input_path) if File.exist?(audio_input_path)
    File.delete(image_input_path) if File.exist?(image_input_path)
    File.delete(movie_output_path) if File.exist?(movie_output_path)
  end
end
