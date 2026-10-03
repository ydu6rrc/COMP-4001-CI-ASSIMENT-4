Vagrant.configure("2") do |config|
config.vm.box = "bento/ubuntu-22.04"
  config.vm.hostname = "Yupeng-Du"
  config.vm.network "private_network", ip: "192.168.56.67"

  config.vm.provider "parallels" do |prl|
    prl.memory = "2048"
    prl.cpus = 2
  end

  config.vm.provision "shell", inline: <<-SHELL
    sudo apt-get remove -y docker docker-engine docker.io containerd runc
    sudo apt-get update
    sudo apt-get install -y ca-certificates curl gnupg
    sudo install -m 0755 -d /etc/apt/keyrings

    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    sudo systemctl enable --now docker
    sudo usermod -aG docker vagrant

    cd /vagrant
    sudo docker compose up -d --build
  SHELL
end