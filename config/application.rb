require_relative 'boot'

require 'rails/all'
require 'sprockets/es6'

Bundler.require(*Rails.groups)


module M2video
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.active_job.queue_adapter = :delayed_job
    config.assets.paths << "#{Rails.root}/app/assets/shared/stylesheets"
    config.assets.paths << "#{Rails.root}/app/assets/shared/javascripts"
  end
end
