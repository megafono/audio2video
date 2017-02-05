class ConversionMailer < ApplicationMailer
  def converted(conversion)
    @conversion = conversion

    @conversion.notified!

    mail(
      :subject => 'Seu video está pronto!',
      :to      => conversion.email,
      :tag     => 'conversion'
    )
  end
end
