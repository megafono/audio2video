class AddMovieUrlToConversion < ActiveRecord::Migration[5.0]
  def change
    add_column :conversions, :movie_url, :string
  end
end
