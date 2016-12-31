class CreateConversions < ActiveRecord::Migration[5.0]
  def change
    create_table :conversions do |t|
      t.string :audio_url
      t.string :image_url
      t.string :email

      t.timestamps
    end
  end
end
