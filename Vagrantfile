Vagrant.configure("2") do |config|
  config.vm.hostname = "yupengdu"
  # eurolinux box only have amd64, my mac is M chip so use bento arm64 one (still centos stream 9)
  config.vm.box = "bento/centos-stream-9"

  config.vm.network "private_network", ip: "192.168.56.53"
  config.vm.network "public_network"

  config.vm.provider "parallels" do |prl|
    prl.memory = "2048"
    prl.cpus = 2
  end
end
